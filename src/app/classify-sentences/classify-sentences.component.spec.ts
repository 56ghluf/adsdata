import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifySentencesComponent } from './classify-sentences.component';

describe('ClassifySentencesComponent', () => {
  let component: ClassifySentencesComponent;
  let fixture: ComponentFixture<ClassifySentencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassifySentencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassifySentencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
