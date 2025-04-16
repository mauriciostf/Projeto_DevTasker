import { AppDataSource } from "../data-source";
import { User } from "../models/User";

export class UserRepository {
  private repo = AppDataSource.getRepository(User);

  async createUser(name: string, email: string, password: string, createdAt: Date) {
    const user = new User(name, email, password, createdAt);
  }

  async findUserByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async findUserById(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ["Tasks"] });
  }

  async updateUser(id: number, fields: Partial<User>) {
    const user = await this.findUserById(id);
    if (!user) return null;
    Object.assign(user, fields);
    return await this.repo.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.findUserById(id);
    if (!user) return null;
    return await this.repo.remove(user);
  }

  async findAllUsers() {
    return await this.repo.find({ relations: ["orders", "favoriteDishes"] });
  }
}