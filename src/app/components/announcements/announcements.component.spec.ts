import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentAnnouncementsComponent } from './announcements.component';

describe('RecentAnnouncementsComponent', () => {
  let component: RecentAnnouncementsComponent;
  let fixture: ComponentFixture<RecentAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentAnnouncementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
