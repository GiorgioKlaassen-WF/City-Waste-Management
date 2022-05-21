import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEncapsulationComponent } from './map-encapsulation.component';

describe('MapEcaptulationComponent', () => {
  let component: MapEncapsulationComponent;
  let fixture: ComponentFixture<MapEncapsulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapEncapsulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEncapsulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
