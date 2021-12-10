import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
} from '@angular/core';
import Map from 'ol/Map';
import ControlMousePosition from 'ol/control/MousePosition';
import { CoordinateFormatterService } from '../../services/coordinate-formatter.service';

@Component({
  selector: 'app-mouse-position',
  template: ``,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MousePositionComponent implements OnInit {
  @Input() map: Map;
  @Input() positionTemplate: string;
  control: ControlMousePosition;

  constructor(
    private element: ElementRef,
    private coordinateFormatter: CoordinateFormatterService
  ) {}

  ngOnInit() {
    this.control = new ControlMousePosition({
      className: 'mouseposition-control',
      coordinateFormat: (coordinates: number[]) =>
        this.coordinateFormatter.numberCoordinates(
          coordinates,
          4,
          this.positionTemplate
        ),
      target: this.element.nativeElement,
      undefinedHTML: undefined,
    });
    this.map.addControl(this.control);
  }
}
