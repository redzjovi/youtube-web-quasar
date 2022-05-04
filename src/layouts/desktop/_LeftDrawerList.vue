<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
  <q-list>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>Home</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="o_explore" />
      </q-item-section>
      <q-item-section>Explore</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="o_radio_button_unchecked" />
      </q-item-section>
      <q-item-section>Shorts</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="subscriptions" />
      </q-item-section>
      <q-item-section>Subscriptions</q-item-section>
    </q-item>
    <q-separator />
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="video_library" />
      </q-item-section>
      <q-item-section>Library</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="history" />
      </q-item-section>
      <q-item-section>History</q-item-section>
    </q-item>
    <q-separator />
    <q-item>
      <q-item-section avatar>
        <!--  -->
      </q-item-section>
      <q-item-section>
        <div>
          Sign in to like videos,<br />
          comment, and subscribe.
        </div>
        <div>
          <q-btn
            color="primary"
            icon="o_account_circle"
            label="SIGN IN"
            outline
          />
        </div>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item-label header>BEST OF YOUTUBE</q-item-label>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="library_music" />
      </q-item-section>
      <q-item-section>Music</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="emoji_events" />
      </q-item-section>
      <q-item-section>Sports</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="sports_esports" />
      </q-item-section>
      <q-item-section>Gaming</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="movie" />
      </q-item-section>
      <q-item-section>Movies</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="newspaper" />
      </q-item-section>
      <q-item-section>News</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="sensors" />
      </q-item-section>
      <q-item-section>Live</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="sensors" />
      </q-item-section>
      <q-item-section>360 Video</q-item-section>
    </q-item>
    <q-separator />
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="add_circle_outline" />
      </q-item-section>
      <q-item-section>Browse channels</q-item-section>
    </q-item>
    <q-separator />
    <q-item-label header>MORE FROM YOUTUBE</q-item-label>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="o_smart_display" />
      </q-item-section>
      <q-item-section>YouTube Premium</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="sensors" />
      </q-item-section>
      <q-item-section>Live</q-item-section>
    </q-item>
    <q-separator />
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="o_settings" />
      </q-item-section>
      <q-item-section>Settings</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="o_flag" />
      </q-item-section>
      <q-item-section>Report history</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="help_outline" />
      </q-item-section>
      <q-item-section>Help</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="o_feedback" />
      </q-item-section>
      <q-item-section>Send feedback</q-item-section>
    </q-item>
  </q-list>
</template>
