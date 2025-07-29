<script setup lang="ts">
import { cn } from '@/lib/utils';

type ShapeType = 'circle' | 'triangle' | 'square' | 'all';

interface RippleProps {
  shapeType?: ShapeType;
  mainShapeSize?: number;
  mainShapeOpacity?: number;
  numShapes?: number;
  class?: string;
}

const props = withDefaults(defineProps<RippleProps>(), {
  shapeType: 'circle',
  mainShapeSize: 210,
  mainShapeOpacity: 0.24,
  numShapes: 8,
});

const showCircles = computed(
  () => props.shapeType === 'circle' || props.shapeType === 'all'
);
const showTriangles = computed(
  () => props.shapeType === 'triangle' || props.shapeType === 'all'
);
const showSquares = computed(
  () => props.shapeType === 'square' || props.shapeType === 'all'
);
</script>

<template>
  <div
    :class="
      cn(
        'absolute inset-0 bg-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]',
        props.class
      )
    "
  >
    <!-- Circles -->
    <template v-if="showCircles">
      <div
        v-for="(_, i) in Array.from({ length: props.numShapes })"
        :key="`circle-${i}`"
      >
        <div
          :class="`absolute animate-ripple rounded-full border bg-primary/25 shadow-xl [--i:${i}]`"
          :style="{
            width: `${props.mainShapeSize + i * 70}px`,
            height: `${props.mainShapeSize + i * 70}px`,
            opacity: props.mainShapeOpacity - i * 0.03,
            animationDelay: `${i * 0.06}s`,
            borderStyle: i === props.numShapes - 1 ? 'dashed' : 'solid',
            borderWidth: '1px',
            borderColor: `hsl(var(--primary), ${5 + (i * 5) / 100})`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1)',
          }"
        />
      </div>
    </template>

    <!-- Triangles -->
    <template v-if="showTriangles">
      <div
        v-for="(_, i) in Array.from({ length: props.numShapes })"
        :key="`triangle-${i}`"
      >
        <div
          :class="`absolute animate-ripple bg-primary/25 shadow-xl [--i:${i}]`"
          :style="{
            width: `${props.mainShapeSize + i * 60}px`,
            height: `${props.mainShapeSize + i * 60}px`,
            opacity: props.mainShapeOpacity - i * 0.03,
            animationDelay: `${i * 0.06}s`,
            borderStyle: i === props.numShapes - 1 ? 'dashed' : 'solid',
            borderWidth: '1px',
            borderColor: `hsl(var(--primary), ${5 + (i * 5) / 100})`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }"
        />
      </div>
    </template>

    <!-- Squares -->
    <template v-if="showSquares">
      <div
        v-for="(_, i) in Array.from({ length: props.numShapes })"
        :key="`square-${i}`"
      >
        <div
          :class="`absolute animate-ripple border bg-primary/25 shadow-xl [--i:${i}]`"
          :style="{
            width: `${props.mainShapeSize + i * 50}px`,
            height: `${props.mainShapeSize + i * 50}px`,
            opacity: props.mainShapeOpacity - i * 0.03,
            animationDelay: `${i * 0.06}s`,
            borderStyle: i === props.numShapes - 1 ? 'dashed' : 'solid',
            borderWidth: '1px',
            borderColor: `hsl(var(--primary), ${5 + (i * 5) / 100})`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1)',
          }"
        />
      </div>
    </template>
  </div>
</template>
