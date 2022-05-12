<script lang="ts">
import { defineComponent, h, PropType } from 'vue'

export default defineComponent({
  props: {
    renderFunction: {
      type: Function,
      default: undefined
    },
    scope: {
      type: Object as PropType<{
        row: any
        column: any
        $index: number
      }>,
      default: null
    }
  },
  render() {
    if (typeof this.scope === 'string') {
      return this.renderFunction && this.renderFunction(h, this.scope)
    }
    return this.renderFunction && this.renderFunction(h, this.scope.row, this.scope.column, this.scope.$index)
  }
})
</script>
