import { getRepository, Repository } from "typeorm";

import UserCourses from "../models/UserCourses";

interface CreateUserCourseDTO {
  user_id: string;
  course_id: string;
  expires_in: Date;
}

// interface UpdateByUserIdAndCourseIdDTO {
//   user_id: string;
//   course_id: string;
//   data: {
//     exam_submit_id?: string;
//     certification_id?: string;
//     expires_in?: string;
//   };
// }

export default class UserCoursesRepository {
  private ormRepository: Repository<UserCourses>;

  constructor() {
    this.ormRepository = getRepository(UserCourses);
  }

  public async findAll(): Promise<UserCourses[]> {
    const user = await this.ormRepository.find();

    return user;
  }

  public async findAllByUser(user_id: string): Promise<UserCourses[]> {
    const userCourses = await this.ormRepository.find({
      relations: ["course"],
      where: { user_id },
      order: {
        created_at: -1,
      },
    });

    return userCourses;
  }

  public async create(data: CreateUserCourseDTO): Promise<UserCourses> {
    const userCourse = this.ormRepository.create(data);

    await this.ormRepository.save(userCourse);

    return userCourse;
  }

  public async update(userCourseData: UserCourses): Promise<UserCourses> {
    const userCourse = await this.ormRepository.save(userCourseData);

    return userCourse;
  }

  public async findByCertification(
    certification: string,
  ): Promise<UserCourses | undefined> {
    const userCourse = await this.ormRepository.findOne({
      where: { certification },
    });

    return userCourse;
  }

  public async findByUserIdAndCourseIdWithRelations({
    course_id,
    user_id,
  }: {
    course_id: string;
    user_id: string;
  }): Promise<UserCourses | undefined> {
    const userCourse = await this.ormRepository.findOne({
      relations: ["course", "user"],
      where: { user_id, course_id },
    });

    return userCourse;
  }
}
