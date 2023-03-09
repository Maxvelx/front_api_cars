<template>
  <div>
    <div class="wrapper">
      <NavbarComponent></NavbarComponent>
      <SidebarComponent></SidebarComponent>
      <router-view></router-view>
      <!-- Main Footer -->
      <footer class="main-footer pt-4">
        <strong>Copyright Maxvel &copy;</strong>
        <div class="float-right d-none d-sm-inline-block">
          <b>Version</b> 0.1
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/views/app/layouts/NavbarComponent.vue";
import SidebarComponent from "@/views/app/layouts/SidebarComponent.vue";

export default {
  name: 'App',
  components: {SidebarComponent, NavbarComponent},
}
</script>

<style scoped>

</style>
