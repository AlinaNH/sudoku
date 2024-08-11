<template>
  <div class="modal-wrap win-modal">
    <section class="modal">
      <h1 class="modal__title">
        Congratulations! You Won!
      </h1>
      <p class="modal__text">
        Well done! You've completed the game with great skill and determination.
        Enjoy your victory!
      </p>
      <button
        class="button button-bordered button-filled button-lg win-modal__button"
        @click="store.startGame()"
      >
        Start new game
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
const store = useStore();
</script>