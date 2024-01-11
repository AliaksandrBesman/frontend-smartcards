<template>
  <h4>
    Cтуденты выполнившие модуль{{ "( " + userCompletedCourse?.length + " )" }}
  </h4>
  <div v-if="userCompletedCourse?.length && usersTestResult">
    <p>Лучший результат: {{ bestResult }}</p>
    <p>Средний результат: {{ averageResult }}</p>
    <p>Худший результат: {{ worstResult }}</p>
  </div>
  <table v-if="userCompletedCourse?.length && usersTestResult">
    <thead>
      <tr>
        <th>Логин</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Отчество</th>
        <th>Рузультат</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in userCompletedCourse" :key="user.id">
        <td>{{ user.login }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.surname }}</td>
        <td>{{ user.secondName }}</td>
        <td v-if="usersTestResult && !isNotChecked(user.id)">
          {{ correctAnswersCount(user.id) + "/" + qanA.length }}
        </td>
        <td v-else>Не проверено</td>

        <td>
          <button
            class="btn"
            @click="
              $router.push(
                '/check_test/' + this.$route.params.id + '/' + user.id
              )
            "
          >
            Проверить
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions([
      "fetchGetUsersCOmpletedTesByModuleId",
      "fetchGetUsersTestResultByModuleId",
    ]),
    correctAnswersCount(user_id) {
      return this.usersTestResult.filter(
        (answer) => answer.userId === user_id && answer.accuracy
      ).length;
    },
    isNotChecked(user_id) {
      return this.usersTestResult.some(
        (answer) => answer.userId === user_id && answer.accuracy == null
      );
    },
  },
  computed: {
    ...mapGetters([
      "c_module",
      "user",
      "qanA",
      "testUserAnsw",
      "notGrantedUsers",
      "userCompletedCourse",
      "usersTestResult",
    ]),
    bestResult() {
      return Math.max(
        ...this.usersWithCheckedTest.map((student) =>
          this.correctAnswersCount(student.id)
        )
      );
    },
    averageResult() {
      const sum = this.usersWithCheckedTest.reduce(
        (accumulator, student) =>
          accumulator + this.correctAnswersCount(student.id),
        0
      );
      return sum / this.usersWithCheckedTest.length;
    },
    worstResult() {
      return Math.min(
        ...this.usersWithCheckedTest.map((student) =>
          this.correctAnswersCount(student.id)
        )
      );
    },
    usersWithCheckedTest() {
      const usersWithCheckedTest = [];

      this.userCompletedCourse.forEach((user) => {

        if (!this.isNotChecked(user.id)) {
          usersWithCheckedTest.push(user);
        }
      });

      return usersWithCheckedTest;
    },
  },
  async mounted() {
    await this.fetchGetUsersCOmpletedTesByModuleId(this.$route.params.id);
    await this.fetchGetUsersTestResultByModuleId(this.$route.params.id);
  },
};
</script>

<style>
</style>