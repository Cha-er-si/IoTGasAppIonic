import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() header!: string;
  @Input() state!: string;
  @Input() value!: string;
  @Input() stateTitle!: string;
  @Input() valueTitle!: string;
  @Input() class!: string;

  constructor() {}

  ngOnInit() {}
}
