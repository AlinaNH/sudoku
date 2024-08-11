<template>
  <main>
    <GameInfo />
    <Grid />
    <Numpad />
    <TransitionGroup>
      <WinModal v-if="store.isWin" />
    </TransitionGroup>
  </main>
</template>

<script setup lang="ts">
const store = useStore();
</script>

<style lang="css" src="./styles.css"/>