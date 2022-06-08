<template>
  <div class="mx-auto overflow-x-hidden dark:text-primary-content">
    <h2 class="text-base-100 dark:text-primary-content text-2xl my-4 font-bold">Пользователи</h2>
    <div class="overflow-x-auto w-full">
      <table class="table w-full text-center">
        <thead>
        <tr>
          <td>Id</td>
          <td>E-mail</td>
          <td>Роль</td>
          <td>Зарегестрирован</td>
          <td></td>
        </tr>
        </thead>
        <tbody>
        <a-users-item
            v-for="item in this.users"
            :key="item"
            :users_data="item"
        />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AUsersItem from "@/components/Admin/a-users-item";
import {mapGetters} from "vuex";
import store from "@/vuex/store";
export default {
  name: "a-users",
  components: {AUsersItem},
  computed: {
    ...mapGetters({
      users: "USERS_ADMIN"
    })
  },
  mounted() {
    store.dispatch('GET_ALL_USERS_ADMIN')
  }
}
</script>

<style scoped>

</style>