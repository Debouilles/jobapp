import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { services } from './service-list.page';

describe('ServiceListPage', () => {
  let component: services;
  let fixture: ComponentFixture<services>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ services ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(services);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
