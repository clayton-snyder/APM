import { Pipe, PipeTransform } from "@angular/core";

@Pipe
({
    name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform
{
    name: string = 'convertToSpaces';

    transform(value: string, replaceMe: string, replaceBy: string): string
    {
        // String to be built and returned
        let returner: string = '';
        let i: number = 0;
        for (i = 0; i < value.length; i++)
        {
            if (value.charAt(i) == replaceMe)
            {
                returner += replaceBy;
            }
            else
            {
                returner += value.charAt(i);
            }
        }
        return returner;
    }
}