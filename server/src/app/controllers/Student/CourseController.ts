import { Request, Response } from "express";

import { classToClass } from "class-transformer";
import { isAfter, differenceInDays } from "date-fns";

import UserCoursesRepository from "../../repositories/UserCoursesRepository";
import ShowCourseService from "../../services/ShowCourseService";

class CourseController {
  async show(req: Request, res: Response): Promise<Response> {
    const userCoursesRepository = new UserCoursesRepository();
    const showCourse = new ShowCourseService();

    const user_id = req.user.id;
    const { course_id } = req.params;

    const userCourses = await userCoursesRepository.findAllByUser(user_id);

    const userAlreadyContentCourse = userCourses.find(userCourse => {
      const courseExpired = isAfter(new Date(), userCourse.expires_in);

      return userCourse.course_id === course_id && !courseExpired;
    });

    if (!userAlreadyContentCourse) {
      return res
        .status(403)
        .json({ message: "You are not allowed to access this course." });
    }

    const course = await showCourse.execute(course_id);

    const days_remaining = differenceInDays(
      userAlreadyContentCourse.expires_in,
      new Date(),
    );

    return res.json({ ...classToClass(course), days_remaining });
  }
}

export default new CourseController();
