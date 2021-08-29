import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  autorName = '© Anastasiia Balzamova';

  autorLink = 'https://github.com/Balzamova';

  schoolName = '© Rolling Scopes School';

  schoolLink = 'https://docs.rs.school/';

  constructor() { }
}
