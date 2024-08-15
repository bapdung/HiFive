FROM openjdk:17
ENV SPRING_PROFILES_ACTIVE=prod
RUN mkdir -p /app/recordings
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "/app.jar", "--spring.profiles.active=${SPRING_PROFILES_ACTIVE}"]