import { Routes } from '@angular/router';

import { AddSentencesComponent } from './add-sentences/add-sentences.component';
import { ClassifySentencesComponent } from './classify-sentences/classify-sentences.component';

export const routes: Routes = [
    {
        path: 'addsentences',
        title: 'Add Sentences',
        component: AddSentencesComponent,
    },
    {
        path: 'classify',
        title: 'Classify',
        component: ClassifySentencesComponent,
    }
];
