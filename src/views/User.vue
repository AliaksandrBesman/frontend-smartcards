<template>
  <div>
    <h1>User Profile</h1>
    <div class="row">
      <div class="input-field col s6">
        <input id="login" type="text" class="validate" :value="user.login" disabled>
        <label for="login">Login</label>
      </div>
      <div class="input-field col s6">
        <input id="role" type="text" class="validate" :value="user.role" disabled>
        <label for="role">Role</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <input id="name" type="text" class="validate" :value="user.name" disabled>
        <label for="name">Name</label>
      </div>
      <div class="input-field col s4">
        <input id="surname" type="text" class="validate" :value="user.surname" disabled>
        <label for="surname">Surname</label>
      </div>
      <div class="input-field col s4">
        <input id="patronymic" type="text" class="validate" :value="user.patronymic" disabled>
        <label for="patronymic">Patronymic</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s6">
        <input id="faculty" type="text" class="validate" :value="user.faculty" disabled>
        <label for="faculty">Faculty</label>
      </div>
      <div class="input-field col s6">
        <input id="department" type="text" class="validate" :value="user.department" disabled>
        <label for="department">Department</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <input id="specialization" type="text" class="validate" :value="user.specialization" disabled>
        <label for="specialization">Specialization</label>
      </div>
      <div class="input-field col s2">
        <input id="course" type="text" class="validate" :value="user.course" disabled>
        <label for="course">Course</label>
      </div>
      <div class="input-field col s6">
        <input id="group" type="text" class="validate" :value="user.group" disabled>
        <label for="group">Group</label>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['user'])
  },
  mounted() {
    setTimeout(()=>{M.updateTextFields()},0)
  },
}
</script>
