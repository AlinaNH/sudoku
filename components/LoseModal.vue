<template>
  <div class="modal-wrap lose-modal">
    <section class="modal">
      <h1 class="modal__title">
        Better Luck Next Time
      </h1>
      <p class="modal__text">
        The game was tough and you didn't make it this time.
        Learn from this experience and come back stronger!
      </p>
      <div class="modal__buttons">
        <button
          v-if="store.isRetry"
          data-test="try-again"
          class="button button-bordered button-lg"
          @click="store.tryAgain()"
        >
          Try again
        </button>
        <button
          data-test="start-game-after-lost"
          class="button button-bordered button-filled button-lg"
          @click="store.startGame()"
        >
          Start new game
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const store = useStore();
</script>

<style scoped lang="css">
.lose-modal__buttons {
  display: flex;
  gap: 1vh;
}
</style>