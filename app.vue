<template>
  <main>
    <GameInfo />
    <Grid />
    <Numpad />
    <TransitionGroup>
      <WinModal v-if="store.isWin" />
      <LoseModal v-if="store.isLose" />
    </TransitionGroup>
  </main>
</template>

<script setup lang="ts">
const store = useStore();
</script>

<style lang="css" src="./styles.css"/>