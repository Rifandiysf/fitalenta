import { Program } from "../../../generated/prisma/client";
import { REGISTRATION_TIMEZONE_OFFSET_HOURS } from "../../config/registration.config";
import { RegistrationErrors } from "../../errors/registration.errors";

type PolicyProgram = Pick<
  Program,
  "status" | "registrationDeadline" | "capacity" | "currentParticipants"
>;

const MS_PER_HOUR = 3_600_000;

function endOfDeadlineDay(deadline: Date): Date {
  return new Date(
    deadline.getTime() + (24 - REGISTRATION_TIMEZONE_OFFSET_HOURS) * MS_PER_HOUR - 1
  );
}

export function assertProgramAcceptsRegistration(program: PolicyProgram, now = new Date()): void {
  if (program.status === "full") throw RegistrationErrors.programFull();
  if (program.status !== "active") throw RegistrationErrors.programNotActive();

  if (program.registrationDeadline && now > endOfDeadlineDay(program.registrationDeadline)) {
    throw RegistrationErrors.deadlinePassed();
  }

  if (program.capacity !== null && program.currentParticipants >= program.capacity) {
    throw RegistrationErrors.programFull();
  }
}