<template>
  <main>
    <Grid />
    <Numpad />
  </main>
</template>

<style>
:root {
  --hover-color: #C0CCB7;
  --active-color: #789064;
}

* {
  box-sizing: border-box;
}

body {
  margin: unset;
  background-color: #F5F5F5;
  font-family: Verdana, sans-serif;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 5vh;
}
</style>