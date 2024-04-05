import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auto-complete-input',
  template: `
    <input type="text" (change)="onChange($event)"/>
    <app-suggestion-list [loading]="flag" [suggestions]="suggestions"/>
`,
  styles: [''],
})
export class AutoCompleteInputComponent {
  // List of possible suggestions to display.

  @Input() len =4;
  public suggestions: Array<any> = [];

  flag :boolean= false
  constructor(private http: HttpClient) {}
  bs : new BehaviouSubject<string>('')

  ngOninit(){
    bs.pipe(debounceTime(1000)).subscribe((x)=>{
      this.flag = true;
     const abc = forkjoin([
      this.http.get(`https://api.example.com/employees?startsWith=${x}`),this.http.get(`https://api.example.com/manager?startsWith=${x}`)];
      
      abc.subscribe(res: Array<any>) => {
        this.flag =false
          this.suggestions = res;
        },
        (err) => {
          this.flag = false
          console.log(err);
        }
    });
  }
  // Handler when the text input changes to show a list of suggestions from
  // GET https://api.example.com/employees?startsWith=XXX
  public onChange(e: any) {
    // TODO?
    if(e.target.value.length < this.len){
      return false;
    }
this.bs.next(e.target.value);
  


   

   
  
   
  }

}
