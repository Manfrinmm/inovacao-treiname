import { getMongoRepository, MongoRepository } from "typeorm";

import SubmitExam from "../models/schemas/SubmitExam";

interface QuestionProps {
  title: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  correct_answer: string;
  answer_mark: string;
}

interface CreateSubmitExamDTO {
  course_id: string;
  user_id: string;
  questions: Array<QuestionProps>;
}

export default class SubmitExamsRepository {
  private ormRepository: MongoRepository<SubmitExam>;

  constructor() {
    this.ormRepository = getMongoRepository(SubmitExam, "mongo");
  }

  public async findAll(): Promise<SubmitExam[]> {
    const user = await this.ormRepository.find();

    return user;
  }

  public async create(data: CreateSubmitExamDTO): Promise<SubmitExam> {
    const submitExam = this.ormRepository.create(data);

    await this.ormRepository.save(submitExam);

    return submitExam;
  }

  public async findOne(submit_id: string): Promise<SubmitExam | undefined> {
    const user = await this.ormRepository.findOne(submit_id);

    return user;
  }

  public async updateAccuracy({
    submit_id,
    accuracy,
  }: {
    submit_id: string;
    accuracy: number;
  }): Promise<SubmitExam | undefined> {
    const submit_exam = await this.ormRepository.findOne(submit_id);
    submit_exam.accuracy = accuracy;

    await this.ormRepository.save(submit_exam);

    return submit_exam;
  }

  // public async findByUserId(user_id: string): Promise<SubmitExam | undefined> {
  //   const submitExam = await this.ormRepository.findOne({ user_id });

  //   return submitExam;
  // }

  // public async findByCourseId(
  //   course_id: string,
  // ): Promise<SubmitExam | undefined> {
  //   const user = await this.ormRepository.findOne({ course_id });

  //   return user;
  // }

  // For tests
  public async truncate(): Promise<void> {
    await this.ormRepository.deleteMany({});
  }
}
