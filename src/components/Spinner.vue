<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <svg class="spinner">
    <circle cx="20" cy="20" r="18"></circle>
  </svg>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Spinner',
});
</script>

<style scoped lang="scss">
$spinnerSize: 40;

svg.spinner {
  width: $spinnerSize + px;
  height: $spinnerSize + px;
  x: 0px;
  y: 0px;
  viewbox: 0 0 $spinnerSize $spinnerSize;

  circle {
    fill: transparent;
    stroke: #212121;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: (3.14 * $spinnerSize);
    -webkit-transform-origin: (0.5px * $spinnerSize) (0.5px * $spinnerSize) 0;
    -moz-transform-origin: (0.5px * $spinnerSize) (0.5px * $spinnerSize) 0;
    -ms-transform-origin: (0.5px * $spinnerSize) (0.5px * $spinnerSize) 0;
    -o-transform-origin: (0.5px * $spinnerSize) (0.5px * $spinnerSize) 0;
    transform-origin: (0.5px * $spinnerSize) (0.5px * $spinnerSize) 0;
    -webkit-animation: spinner 2s linear infinite;
    -moz-animation: spinner 2s linear infinite;
    -ms-animation: spinner 2s linear infinite;
    -o-animation: spinner 2s linear infinite;
    animation: spinner 2s linear infinite;
  }
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    stroke-dashoffset: (0.66 * $spinnerSize);
  }
  50% {
    -webkit-transform: rotate(720deg);
    stroke-dashoffset: (3.14 * $spinnerSize);
  }
  100% {
    -webkit-transform: rotate(1080deg);
    stroke-dashoffset: (0.66 * $spinnerSize);
  }
}

@-moz-keyframes spinner {
  0% {
    -moz-transform: rotate(0deg);
    stroke-dashoffset: (0.66 * $spinnerSize);
  }
  50% {
    -moz-transform: rotate(720deg);
    stroke-dashoffset: (3.14 * $spinnerSize);
  }
  100% {
    -moz-transform: rotate(1080deg);
    stroke-dashoffset: (0.66 * $spinnerSize);
  }
}

@-ms-keyframes spinner {
  0% {
    -ms-transform: rotate(0deg);
    stroke-dashoffset: (0.66 * $spinnerSize);
  }
  50% {
    -ms-transform: rotate(720deg);
    stroke-dashoffset: (3.14 * $spinnerSize);
  }
  100% {
    -ms-transform: rotate(1080deg);
    stroke-dashoffset: (0.66 * $spinnerSize);
  }
}

@-o-keyframes spinner {
  0% {
    -o-transform: rotate(0deg);
    stroke-dashoffset: (0.66 * $spinnerSize);
  }
  50% {
    -o-transform: rotate(720deg);
    stroke-dashoffset: (3.14 * $spinnerSize);
  }
  100% {
    -o-transform: rotate(1080deg);
    stroke-dashoffset: (0.66 * $spinnerSize);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
    stroke-dashoffset: (0.66 * $spinnerSize);
  }
  50% {
    transform: rotate(720deg);
    stroke-dashoffset: (3.14 * $spinnerSize);
  }
  100% {
    transform: rotate(1080deg);
    stroke-dashoffset: (0.66 * $spinnerSize);
  }
}
</style>
