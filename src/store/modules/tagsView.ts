import { defineStore } from 'pinia'
import { TagviewState } from '@/types/store'

export const useTagsViewStore = defineStore('tagsview', {
  state: (): TagviewState => ({
    tagsViewArr: []
  }),
  actions: {
    ADD_TAGVIEW(payload: any) {
      const isInArr = this.tagsViewArr?.some(item => item.path === payload.path)
      if(isInArr) return
      this.tagsViewArr?.push({
        ...payload,
        title: payload.meta.title || 'no-name'
      })
    },
    DEL_TAGVIEW(payload: any) {
      const findex = this.tagsViewArr?.findIndex(item => item.path === payload.path)
      if(typeof findex !== 'undefined' && findex > -1) {
        this.tagsViewArr?.splice(findex, 1)
      }
    },
    DEL_OTHERS_TAGVIEWS(payload: any) {
      this.tagsViewArr = this.tagsViewArr?.filter(v => {
        return v.meta.affix || v.path === payload.path
      });
    },
    DEL_ALL_TAGVIEWS() {
      const affixTags = this.tagsViewArr?.filter(tag => tag.meta.affix)
		  this.tagsViewArr = affixTags
    }
  },
})