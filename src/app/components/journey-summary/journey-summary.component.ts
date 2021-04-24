import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Ticket } from '../../interfaces/ticket';
import { TicketGenerateService } from '../../services/ticket-generate.service';

@Component({
  selector: 'app-journey-summary',
  templateUrl: './journey-summary.component.html',
  styleUrls: ['./journey-summary.component.css']
})
export class JourneySummaryComponent implements OnInit {

  ticketId: any;
  ticket: Ticket | undefined;

  constructor(private route: ActivatedRoute,
              private ticketService:TicketGenerateService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.ticketId = params.get('id');
      this.ticket = this.ticketService.getTicketById(this.ticketId);
      if(!this.ticket){
          this.router.navigate(['/notfound']);
      }
    })
  }
}
