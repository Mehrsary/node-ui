<script setup lang="ts">
import ProposalTable from "~/components/projects/ProposalTable.vue";

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <ProposalTable />
</template>

<style scoped lang="scss"></style>
