import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMascotasComponent } from './detalle-mascotas.component';

describe('DetalleMascotasComponent', () => {
  let component: DetalleMascotasComponent;
  let fixture: ComponentFixture<DetalleMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleMascotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
