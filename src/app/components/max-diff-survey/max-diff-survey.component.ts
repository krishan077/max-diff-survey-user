import { Component, OnInit } from '@angular/core';
import { Concept } from '../../models/concept.model';
import { Response } from '../../models/response.model';
import { ProbeData } from '../probe-question/probe-question.component';


@Component({
  selector: 'app-max-diff-survey',
  templateUrl: './max-diff-survey.component.html',
  styleUrl: './max-diff-survey.component.css'
})
export class MaxDiffSurveyComponent {
 concepts: Concept[] = [];
  sets: Concept[][] = [];
  currentSetIndex = 0;
  responses: Response[] = [];
  surveyComplete = false;
  currentStage: 'maxdiff' | 'probe' = 'maxdiff';
  pendingMaxDiff: { best: Concept; worst: Concept } | null = null;
  progress = 0;

  ngOnInit() {
    this.concepts = this.generateConcepts();
    this.sets = this.generateSets(this.concepts, 5);
  }

  generateConcepts(): Concept[] {
    return [
  { id: "1", name: "Modern Office Workspace", imageUrl: "https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxMTczMTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "2", name: "Coffee Shop Interior", imageUrl: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTQ2NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "3", name: "Minimalist Bedroom", imageUrl: "https://images.unsplash.com/photo-1610307522657-8c0304960189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmVkcm9vbSUyMGRlc2lnbnxlbnwxfHx8fDE3NjExMjk3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "4", name: "Modern Kitchen", imageUrl: "https://images.unsplash.com/photo-1682888813795-192fca4a10d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc2MTIwNjc5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "5", name: "Cozy Living Room", imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjExNDgwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "6", name: "Outdoor Patio", imageUrl: "https://images.unsplash.com/photo-1661024768242-5fd7c8f1e3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcGF0aW8lMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzYxMjAyNzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "7", name: "Home Gym", imageUrl: "https://images.unsplash.com/photo-1591311630200-ffa9120a540f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2MTIwOTM0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "8", name: "Reading Nook", imageUrl: "https://images.unsplash.com/photo-1623771702313-39dc4f71d275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwbm9vayUyMGJvb2tzfGVufDF8fHx8MTc2MTIzODk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "9", name: "Modern Bathroom", imageUrl: "https://images.unsplash.com/photo-1688786219616-598ed96aa19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMGRlc2lnbnxlbnwxfHx8fDE3NjExNzU5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "10", name: "Home Office Desk", imageUrl: "https://images.unsplash.com/photo-1614598389565-8d56eddd2f48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwb2ZmaWNlJTIwZGVza3xlbnwxfHx8fDE3NjExNzgxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "11", name: "Dining Room", imageUrl: "https://images.unsplash.com/photo-1547062200-f195b1c77e30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjByb29tJTIwdGFibGV8ZW58MXx8fHwxNzYxMjM4OTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "12", name: "Kids Playroom", imageUrl: "https://images.unsplash.com/photo-1633104319071-4fa6fa12a613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGxheXJvb20lMjB0b3lzfGVufDF8fHx8MTc2MTE1NTQwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "13", name: "Garden Space", imageUrl: "https://images.unsplash.com/photo-1664023304975-58b2e587d38d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBvdXRkb29yJTIwcGxhbnRzfGVufDF8fHx8MTc2MTIzODk1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "14", name: "Walk-in Closet", imageUrl: "https://images.unsplash.com/photo-1708397016786-8916880649b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxrJTIwaW4lMjBjbG9zZXR8ZW58MXx8fHwxNzYxMTU0ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "15", name: "Home Theater", imageUrl: "https://images.unsplash.com/photo-1591452706295-06d0d6abc3aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwdGhlYXRlciUyMHJvb218ZW58MXx8fHwxNzYxMjM4OTU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "16", name: "Laundry Room", imageUrl: "https://images.unsplash.com/photo-1639010357069-64a5c260589f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXVuZHJ5JTIwcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTIzODk1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "17", name: "Art Studio", imageUrl: "https://images.unsplash.com/photo-1759333213207-daabf2584348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdHVkaW8lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxMTI0MDAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "18", name: "Wine Cellar", imageUrl: "https://images.unsplash.com/photo-1760573851473-c554a53c9d28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwY2VsbGFyJTIwc3RvcmFnZXxlbnwxfHx8fDE3NjEyMzg5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "19", name: "Home Bar", imageUrl: "https://images.unsplash.com/photo-1704383014623-a6630096ff8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwYmFyJTIwY291bnRlcnxlbnwxfHx8fDE3NjEyMzg5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "20", name: "Meditation Room", imageUrl: "https://images.unsplash.com/photo-1627257365018-07f00041b023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcm9vbSUyMHplbnxlbnwxfHx8fDE3NjEyMzg5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "21", name: "Music Studio", imageUrl: "https://images.unsplash.com/photo-1522870389523-7e83c0065eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGluc3RydW1lbnRzfGVufDF8fHx8MTc2MTE0NDIxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "22", name: "Craft Room", imageUrl: "https://images.unsplash.com/photo-1760914939644-fccdb02eb8d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMHJvb20lMjBzdXBwbGllc3xlbnwxfHx8fDE3NjEyMzg5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "23", name: "Home Library", imageUrl: "https://images.unsplash.com/photo-1736147936383-8eb3d7b83d7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwbGlicmFyeSUyMGJvb2tzaGVsZnxlbnwxfHx8fDE3NjEyMzg5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "24", name: "Indoor Pool", imageUrl: "https://images.unsplash.com/photo-1731336478730-09d1f3bc5dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwb29sJTIwbHV4dXJ5fGVufDF8fHx8MTc2MTIyMjMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "25", name: "Sauna & Spa", imageUrl: "https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVuYSUyMHNwYSUyMHJvb218ZW58MXx8fHwxNzYxMjM4OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "26", name: "Game Room", imageUrl: "https://images.unsplash.com/photo-1627257060697-acfbecf5d9a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwcm9vbSUyMGVudGVydGFpbm1lbnR8ZW58MXx8fHwxNzYxMjM4OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "27", name: "Rooftop Terrace", imageUrl: "https://images.unsplash.com/photo-1737466670202-aab34a09f3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwdGVycmFjZSUyMGNpdHl8ZW58MXx8fHwxNzYxMTkzNzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "28", name: "Mudroom", imageUrl: "https://images.unsplash.com/photo-1692394786787-e58d080cf23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWRyb29tJTIwZW50cnl3YXklMjBzdG9yYWdlfGVufDF8fHx8MTc2MTIzODk1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "29", name: "Greenhouse", imageUrl: "https://images.unsplash.com/photo-1641816482139-c04a5fe29b90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbmhvdXNlJTIwcGxhbnRzJTIwaW5kb29yfGVufDF8fHx8MTc2MTIzODk1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "30", name: "Pet Room", imageUrl: "https://images.unsplash.com/photo-1684176025371-7c61dc427350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjByb29tJTIwYW5pbWFsc3xlbnwxfHx8fDE3NjEyMzg5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" }
    ];
  }

  generateSets(concepts: Concept[], setSize: number): Concept[][] {
    const sets: Concept[][] = [];
    const shuffled = [...concepts].sort(() => Math.random() - 0.5);
    const numSets = Math.ceil(concepts.length / 5);

    for (let i = 0; i < numSets; i++) {
      const set: Concept[] = [];
      const availableIndices = Array.from({ length: concepts.length }, (_, i) => i);

      for (let j = 0; j < setSize; j++) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        const conceptIndex = availableIndices[randomIndex];
        set.push(concepts[conceptIndex]);
        availableIndices.splice(randomIndex, 1);
      }

      sets.push(set);
    }

    return sets;
  }

  handleMaxDiffResponse(best: Concept, worst: Concept) {
    this.pendingMaxDiff = { best, worst };
    this.currentStage = 'probe';
    this.updateProgress();
  }

  handleProbeResponse(probeData: ProbeData) {
    if (!this.pendingMaxDiff) return;

    const newResponse: Response = {
      setIndex: this.currentSetIndex,
      concepts: this.sets[this.currentSetIndex],
      best: this.pendingMaxDiff.best,
      worst: this.pendingMaxDiff.worst,
      probeData
    };

    this.responses.push(newResponse);
    console.log(this.responses);
    
    this.pendingMaxDiff = null;

    if (this.currentSetIndex < this.sets.length - 1) {
      console.log('haiga ha');
      
      this.currentSetIndex++;
      this.currentStage = 'maxdiff';
    } else {
      this.surveyComplete = true;
    }

    this.updateProgress();
  }

  updateProgress() {
    const totalSteps = this.sets.length * 2;
    console.log(totalSteps);
    
    const currentStep = (this.currentSetIndex * 2) + (this.currentStage == 'probe' ? 1 : 0);
    console.log(this.currentSetIndex);
    
    console.log(currentStep);
    
    this.progress = this.sets.length > 0 ? (currentStep / totalSteps) * 100 : 0;
    console.log(this.progress);
    
  }

  handleRestart() {
    this.sets = this.generateSets(this.concepts, 5);
    this.currentSetIndex = 0;
    this.responses = [];
    this.surveyComplete = false;
    this.currentStage = 'maxdiff';
    this.pendingMaxDiff = null;
    this.progress = 0;
  }
}
