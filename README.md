here is my project. I have done all the work. Users can see the course list and course details. and admin can log in to the website. log in as an admin using email: --> [saimun@gmail.com] and password is--> [12345] admin can add the course, delete the course, and update the course. first login with this email and password after logging this you will get jwt token. when you add a course or delete a course and update a course you need this jwt token. set token headers and use authorization and Bearer token set  the header. you can not access the admin role without a token

Base_url --> https://backend-task-jt5l.onrender.com

Admin login --> https://backend-task-jt5l.onrender.com/api/auth/sign-in

course --> https://backend-task-jt5l.onrender.com/api/course/   (and use route name like [getAll-course] or [getCourse-byId/:courseId] or [update-course/:courseId] or [delete-course/:courseId] or [create-course])
