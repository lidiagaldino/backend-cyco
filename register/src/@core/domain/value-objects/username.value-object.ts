import { Guard } from "../shared/guard/guard";
import { Result } from "../shared/result/result";

export type TUsername = {
    username: string
}

export class Username {
    private props: TUsername;

    private constructor(props: TUsername) {
        this.props = props;
    }

    public static create(username: TUsername): Result<Username>{
        const guardResults = Guard.combine([
            Guard.againstAtLeast(5, username?.username),
            Guard.againstAtMost(20, username?.username),
            Guard.againstNullOrUndefined(username.username, 'username')
        ]);

        if (guardResults.isFailure) {
            return Result.fail<Username>(guardResults.getErrorValue());
          }
          return Result.ok<Username>(new Username(username));
    }

    public getUsername(){
        return this.props.username;
    }
}