import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ email, name }: IRequest): User {
    const UserAlreadyExists = this.usersRepository.findByEmail(email);

    if (UserAlreadyExists) {
      throw new Error("User already exists");
    }

    this.usersRepository.create({ email, name });

    const user = this.usersRepository.findByEmail(email);

    return user


  }
}

export { CreateUserUseCase };
