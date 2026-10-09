import prisma from "../config/prisma";
import { Prisma } from "../../generated/prisma/client";
import { ABOUT_SETTING_GROUP, ABOUT_SETTING_KEY, AboutImageSlot } from "../config/about.config";
import { DEFAULT_ABOUT_CONTENT } from "../config/about.defaults";
import { TeamMemberErrors } from "../errors/teamMember.errors";
import { AboutContent, AboutDocument, AboutUpdateInput } from "../types/team-member.types";
import { removePublicUpload, withUploadCleanup } from "../utils/file";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeWithDefaults(stored: unknown): AboutDocument {
  const defaults = structuredClone(DEFAULT_ABOUT_CONTENT);
  if (!isRecord(stored)) return defaults;

  const { hero, story, ...rest } = stored;

  return {
    ...defaults,
    ...rest,
    hero: { ...defaults.hero, ...(isRecord(hero) ? hero : {}) },
    story: { ...defaults.story, ...(isRecord(story) ? story : {}) },
  };
}

async function readAbout(): Promise<{ content: AboutDocument; updatedAt: Date | null }> {
  const row = await prisma.setting.findUnique({ where: { key: ABOUT_SETTING_KEY } });
  return { content: mergeWithDefaults(row?.value), updatedAt: row?.updatedAt ?? null };
}

async function saveAbout(content: AboutDocument): Promise<Date> {
  const value = content as unknown as Prisma.InputJsonValue;
  const row = await prisma.setting.upsert({
    where: { key: ABOUT_SETTING_KEY },
    update: { value },
    create: { key: ABOUT_SETTING_KEY, value, type: "json", group: ABOUT_SETTING_GROUP },
  });
  return row.updatedAt;
}

function readSlot(content: AboutDocument, slot: AboutImageSlot): string | null {
  return slot === "story" ? content.story.image : content[slot];
}

function writeSlot(content: AboutDocument, slot: AboutImageSlot, path: string | null): AboutDocument {
  return slot === "story"
    ? { ...content, story: { ...content.story, image: path } }
    : { ...content, [slot]: path };
}

export async function getAbout(): Promise<AboutContent> {
  const { content, updatedAt } = await readAbout();
  return { ...content, updatedAt };
}

export async function updateAbout(input: AboutUpdateInput): Promise<AboutContent> {
  if (Object.values(input).every((value) => value === undefined)) {
    throw TeamMemberErrors.nothingToUpdate();
  }

  const { content } = await readAbout();
  const next: AboutDocument = {
    ...content,
    hero: { ...content.hero, ...input.hero },
    story: { ...content.story, ...input.story },
    vision: input.vision ?? content.vision,
    missions: input.missions ?? content.missions,
    journey: input.journey ?? content.journey,
    values: input.values ?? content.values,
  };

  return { ...next, updatedAt: await saveAbout(next) };
}

export async function setAboutImage(slot: AboutImageSlot, path: string | null): Promise<AboutContent> {
  const { content } = await readAbout();
  const previous = readSlot(content, slot);
  const next = writeSlot(content, slot, path);

  const updatedAt = await withUploadCleanup(path, () => saveAbout(next));
  await removePublicUpload(previous);

  return { ...next, updatedAt };
}