<template>
<!-- <div class="drawer-container"> -->
    <div class="drawer">
        <input id="test" class="toggle" type="checkbox">
        <label for=test class="lbl-toggle">{{items.length}} Item(s)</label>
        <div class="collapsible-content">
            <div class="content-inner">
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
            </div>
        </div>
    </div>
<!-- </div> -->
</template>

<script>
export default {
props :{
    items : Array,
}
}
</script>

<style scoped>
    .drawer {

        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 20%;
    }

    input[type='checkbox'] {
        display: none;
    }

    .lbl-toggle {
    display: block;
    text-align: right;
    padding: 0.5rem;
    color: hsl(0, 0%, 25%);
    background: hsl(0, 0%, 65%);
    cursor: pointer;
    transition: all 0.25s ease-out;
    width: 15%;
    margin: auto;
    text-align: center;
    }

    .lbl-toggle::before , .lbl-toggle::after{
    content: ' ';
    display: inline-block;

    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid currentColor;
    vertical-align: middle;
    margin: 0 7%;
    transform: rotate(-90deg) translateX(3px) translateY(-2px);

    transition: transform .2s ease-out;
    }

    .toggle:checked + .lbl-toggle::before , .toggle:checked + .lbl-toggle::after{
    transform: rotate(90deg) translateX(-3px);
    }

    .lbl-toggle:hover {
    color: hsl(0, 0%, 0%);
    }

    .collapsible-content {
    max-height: 0px;
    overflow: hidden;
    transition: max-height .25s ease-in-out;
    }

    .toggle:checked + .lbl-toggle + .collapsible-content {
    max-height: 100vh;
    position: relative;
    bottom: 0;
    }

    .toggle:checked + .lbl-toggle {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    }

    .collapsible-content .content-inner {
    background: hsl(0, 0%, 75%);
    border-bottom: 1px solid hsl(0, 0%, 70%);
    padding: .5rem 1rem;
    }
</style>