<script setup lang="ts">
import KeycloakAuth from "~/components/KeycloakAuth.vue";
</script>

<template>
  <div id="home" class="row">
    <div class="col-6 welcome">
      <h1>FLAME Node UI</h1>
      <KeycloakAuth />
    </div>
    <div class="col-6">
      <img
        src="../assets/hospital_network.jpg"
        alt="Hospital Network"
        class="pimg networkImg"
      />
    </div>
  </div>
</template>

<style lang="scss">
#home {
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pimg {
  height: 650px;
  float: right;
  display: flex;
}

.row {
  display: flex;
}

.p-tabview-header {
  margin-right: 5px;
}

.contentCard {
  margin-top: 1em;
}

.tabCard {
  margin-top: 1em;
}
</style>
