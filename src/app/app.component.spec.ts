import { Component } from '@angular/core';
import { TestBed, ComponentFixture, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent, HeaderStub, FooterStub
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'mytrip-busTicketing'`, () => {
    expect(component.title).toEqual('mytrip-busTicketing');
  });

  it('should render header component',()=>{
    expect(fixture.debugElement.query(By.css('app-header'))).toBeTruthy();
  });

  it('should render footer component',()=>{
    expect(fixture.debugElement.query(By.css('app-footer'))).toBeTruthy();
  });

});

@Component({template:'',selector:'app-header'})
class FooterStub{
}

@Component({template:'',selector:'app-footer'})
class HeaderStub{
}