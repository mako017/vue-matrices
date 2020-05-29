<template>
  <div class="wrap-collabsible">
    <input
      v-bind="{ id: 'collapsible' + item.title }"
      class="toggle"
      type="checkbox"
    />
    <label v-bind="{ for: 'collapsible' + item.title }" class="lbl-toggle">{{
      item.title
    }}</label>
    <div class="collapsible-content">
      <div class="content-inner">
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style scoped>
.wrap-collabsible {
  border-bottom: 1px solid lightgray;
}

input[type="checkbox"] {
  display: none;
}

.lbl-toggle {
  display: block;

  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
  text-align: left;

  padding: 1rem;

  color: hsl(0, 0%, 25%);
  background: hsl(0, 0%, 65%);

  cursor: pointer;

  /* border-radius: 7px; */
  transition: all 0.25s ease-out;
}

.lbl-toggle:hover {
  color: hsl(0, 0%, 0%);
}

.lbl-toggle::before {
  content: " ";
  display: inline-block;

  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid currentColor;
  vertical-align: middle;
  margin-right: 0.7rem;
  transform: translateY(-2px);

  transition: transform 0.2s ease-out;
}

.toggle:checked + .lbl-toggle::before {
  transform: rotate(90deg) translateX(-3px);
}

.collapsible-content {
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.25s ease-in-out;
}

.toggle:checked + .lbl-toggle + .collapsible-content {
  max-height: 100vh;
}

.toggle:checked + .lbl-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.collapsible-content .content-inner {
  background: hsl(0, 0%, 75%);
  border-bottom: 1px solid hsl(0, 0%, 70%);
  padding: 0.5rem 1rem;
  text-align: left;
}
</style>
