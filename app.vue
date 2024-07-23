<template>
  <main>
    <Grid />
    <Numpad />
  </main>
</template>

<style>
:root {
  --hover-color: #C6D1BE;
  --active-color: #789064;

  --shadow-sm: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  --border-radius-sm: 0.5rem;
  --border-radius-lg: 1.5rem;
}

html {
  font-size: 16px;
}

* {
  box-sizing: border-box;
}

body {
  margin: unset;
  color: #333333;
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