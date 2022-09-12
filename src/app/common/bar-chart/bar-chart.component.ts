import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import * as D3 from 'd3';
import {
  from,
  Observable,
  skip,
  Subscription,
} from "rxjs";
import { IFriends } from "../../interfaces/IFriend";


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent implements AfterViewInit , OnDestroy {

  @Input() data: Observable<any[]> = from([]);
  @Input() xCoordinateVal!: string | number;
  @Input() yCoordinateVal!: string;
  @ViewChild('barChartFigure') barChartContainer!: ElementRef;
  dataSubscription!: Subscription;
  private svg!:any;
  private margin: number = 50;
  private width: number = 750 - (this.margin * 2);
  private height: number = 400 - (this.margin * 2);



  createSvg(): void {
    this.svg = D3.select(this.barChartContainer.nativeElement)
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }


  createXaxis(data: any[]): D3.ScaleBand<string> {
     return D3.scaleBand()
       .range([0, this.width])
       .domain(data.map(d => d[this.xCoordinateVal]))
       .padding(0.2);
  }


  createYaxis(): D3.ScaleLinear<number, number> {
    return D3.scaleLinear()
          .domain([0, 100])
          .range([this.height, 0]);
  }


  drawBars(data: any[]): void {
    // Create the X-axis band scale
    const xAsis: D3.ScaleBand<string> = this.createXaxis(data);

    // Draw the X-axis on the DOM
    this.svg?.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(D3.axisBottom(xAsis))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const yAxis:  D3.ScaleLinear<number, number> = this.createYaxis();
    // Draw the Y-axis on the DOM
    this.svg?.append("g")
      .call(D3.axisLeft(yAxis));

    // Create and fill the bars
    this.svg?.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: { [x: string]: string; }) => { return xAsis(d[this.xCoordinateVal]);
      })
      .attr("y", (d: { [x: string]: D3.NumberValue; }) => yAxis(d[this.yCoordinateVal]))
      .attr("width", xAsis.bandwidth())
      .attr("height", (d: { [x: string]: D3.NumberValue; }) => this.height - yAxis(d[this.yCoordinateVal]))
      .attr("fill", "#d04a35");
  }


  ngAfterViewInit(): void {
    this.dataSubscription = this.data?.pipe(
      skip(1),
    ).subscribe((data: IFriends[]) => {
      if (data.length) {
        this.createSvg();
        this.drawBars(data);
      }
    });
  }


  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

}
