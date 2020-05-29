<template>
  <div class="container">
    <h4>Item {{ item.id + 1 }}</h4>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      v-bind="{ id: 'mini' + item.id }"
      viewBox="0 0 101 101"
      @click="saveSvg"
    >
      <defs>
        <path
          id="border"
          d="m 0 0 h 100 v 100 h -100 z "
          fill="#fff"
          stroke="#000"
          stroke-width="2"
        />
        <g v-bind="{ id: 'i' + item.id + '_m0' }" v-html="item.svg[0]"></g>
        <g v-bind="{ id: 'i' + item.id + '_m1' }" v-html="item.svg[1]"></g>
        <g v-bind="{ id: 'i' + item.id + '_m2' }" v-html="item.svg[2]"></g>
        <g v-bind="{ id: 'i' + item.id + '_m3' }" v-html="item.svg[3]"></g>
        <g v-bind="{ id: 'i' + item.id + '_m4' }" v-html="item.svg[4]"></g>
        <g v-bind="{ id: 'i' + item.id + '_m5' }" v-html="item.svg[5]"></g>
        <g v-bind="{ id: 'i' + item.id + '_m6' }" v-html="item.svg[6]"></g>
        <g v-bind="{ id: 'i' + item.id + '_m7' }" v-html="item.svg[7]"></g>
        <g v-bind="{ id: 'i' + item.id + '_m8' }" v-html="item.svg[8]"></g>
      </defs>
      <use transform="translate(0,0) scale(0.3)" href="#border" />
      <use
        transform="translate(0,0) scale(0.3)"
        v-bind="{ href: '#i' + item.id + '_m0' }"
      />
      <use transform="translate(35,0) scale(0.3)" href="#border" />
      <use
        transform="translate(35,0) scale(0.3)"
        v-bind="{ href: '#i' + item.id + '_m1' }"
      />
      <use transform="translate(70,0) scale(0.3)" href="#border" />
      <use
        transform="translate(70,0) scale(0.3)"
        v-bind="{ href: '#i' + item.id + '_m2' }"
      />
      <use transform="translate(0,35) scale(0.3)" href="#border" />
      <use
        transform="translate(0,35) scale(0.3)"
        v-bind="{ href: '#i' + item.id + '_m3' }"
      />
      <use transform="translate(35,35) scale(0.3)" href="#border" />
      <use
        transform="translate(35,35) scale(0.3)"
        v-bind="{ href: '#i' + item.id + '_m4' }"
      />
      <use transform="translate(70,35) scale(0.3)" href="#border" />
      <use
        transform="translate(70,35) scale(0.3)"
        v-bind="{ href: '#i' + item.id + '_m5' }"
      />
      <use transform="translate(0,70) scale(0.3)" href="#border" />
      <use
        transform="translate(0,70) scale(0.3)"
        v-bind="{ href: '#i' + item.id + '_m6' }"
      />
      <use transform="translate(35,70) scale(0.3)" href="#border" />
      <use
        transform="translate(35,70) scale(0.3)"
        v-bind="{ href: '#i' + item.id + '_m7' }"
      />
      <use transform="translate(70,70) scale(0.3)" href="#border" />
      <use
        transform="translate(70,70) scale(0.3)"
        v-bind="{ href: '#i' + item.id + '_m8' }"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    saveSvg(event) {
      let id = event.target.parentNode.id;
      let name = "Item" + id.replace("mini", "") + ".svg";
      let svgEl = document.getElementById(id);
      svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      var svgData = svgEl.outerHTML;
      var preface = '<?xml version="1.0" standalone="no"?>\r\n';
      var svgBlob = new Blob([preface, svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      var svgUrl = URL.createObjectURL(svgBlob);
      var downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
  },
};
</script>

<style scoped>
svg {
  /* width: 25%; */
  margin: 0.7rem;
}

.container {
  width: 20%;
  min-width: 200px;
  /* margin: 1rem; */
  display: flex;
  flex-direction: column;
}
.container > * {
  justify-self: center;
  align-self: center;
}
</style>
