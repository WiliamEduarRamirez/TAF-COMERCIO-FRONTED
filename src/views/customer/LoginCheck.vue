<template>
  <auth-login-check></auth-login-check>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthLoginCheck from '@/features/customer/auth/AuthLoginCheck.vue';
@Component({
  components: { AuthLoginCheck },
})
export default class LoginCheck extends Vue {

}
</script>

<style scoped></style>
