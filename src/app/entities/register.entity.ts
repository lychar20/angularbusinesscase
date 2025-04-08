export interface RegisterInput {
    email: string;
    password: string;
    confirmedPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthDate: string;
}

export namespace RegisterInput {
    export function formatBirthDate(birthDate: string): string {
      const dateSplit = birthDate.split('/');
      return `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
    }
  }