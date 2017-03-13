import {
   animate,
   AnimationEntryMetadata,
   state,
   style,
   transition,
   trigger
} from '@angular/core';

export const slideInDownAnimation: AnimationEntryMetadata =
   trigger('routeAnimation', [
      state('*',
         style({
            opacity: 1,
            transform: 'translateX(0)'
         })
      ),
      transition(':enter', [
         style({
            opacity: 0,
            transform: 'translateX(-20%)'
         }),
         animate('0.8s ease-in')
      ]),
      transition(':leave', [
         animate('0.8s ease-in', style({
            opacity: 0,
            transform: 'translateX(60%)'
         }))
      ])
   ]);