<template>
  <div>
    Hello World
    <Html :lang="dynamic > 50 ? 'en-GB' : 'en-US'">
      <Head>
        <Title>{{ dynamic }} title</Title>
        <Meta name="description" :content="`My page's ${dynamic} description`" />
        <Link rel="preload" href="/test.txt" as="script" />
        <Style type="text/css" :children="styleString" />
      </Head>
    </Html>

    <button class="blue" @click="dynamic = Math.random() * 100">
      Click me
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({ dynamic: 49, styleString: 'body { background-color: green; }' })
}
</script>