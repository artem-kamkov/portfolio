<script>
  let isDark = false;

  function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
  }
</script>

<input type="checkbox" id="theme-toggle" hidden on:change={toggleTheme}>
<label for="theme-toggle" class="toggle">
  <span class="slider">
    <span class="icon moon">🌙</span>
    <span class="icon sun">🌞</span>
    <span class="circle"></span>
  </span>
</label>

<style>
  .toggle {
    width: 50px;
    height: 24px;
    display: inline-block;
    cursor: pointer;
    overflow: hidden;
  }

  .slider {
    position: relative;
    background: #222;
    border-radius: 24px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 7px;
    transition: background 0.4s;
  }

  .icon {
    color: #fff;
    font-size: .8rem;
    z-index: 1;
  }

  .circle {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.4s ease;
    z-index: 2;
  }

  input:checked + .toggle .circle {
    transform: translateX(24px);
  }

  input:checked + .toggle .slider {
    background: #f6d365;
  }


</style>