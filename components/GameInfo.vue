<template>
  <section :class="'game-info'">
    <div class="game-info-section disabled">
      <span class="game-info-section__title">
        Level
      </span>
      <span class="game-info-section__text">
        Soming soon
      </span>
    </div>
    <div class="game-info-section disabled">
      <span class="game-info-section__title">
        Score 
      </span>
      <span class="game-info-section__text">
        Soming soon
      </span>
    </div>
    <div class="game-info-section">
      <span class="game-info-section__title">
        Errors
      </span>
      <span
        id="errors"
        class="game-info-section__text"
      >
        {{ store.errors }} / {{ MAX_ERRORS }}
      </span>
    </div>
    <div class="game-info-section disabled">
      <span class="game-info-section__title">
        Timer
      </span>
      <span class="game-info-section__text">
        Soming soon
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MAX_ERRORS } from '@/utils/constants';
const store = useStore();
</script>

<style scoped lang="css">
.game-info {
  display: flex;
  gap: 10px;
}

.game-info-section {
  width: 7.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.313rem;
  padding: 0.8rem;
  background-color: white;
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
}

.game-info-section__title {
  font-weight: 600;
}

.game-info-section__text {
  font-size: 0.875rem;
  opacity: 0.8;
}

.disabled {
  opacity: 0.5;
}
</style>