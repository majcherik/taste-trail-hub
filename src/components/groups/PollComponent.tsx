
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Plus, Trash2, ListChecks } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollProps {
  isGroupModerator?: boolean;
}

export function PollComponent({ isGroupModerator = false }: PollProps) {
  // State for creating polls
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pollTitle, setPollTitle] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { id: "1", text: "", votes: 0 },
    { id: "2", text: "", votes: 0 },
  ]);
  const [allowMultipleVotes, setAllowMultipleVotes] = useState(false);
  const [expireDays, setExpireDays] = useState(7);
  
  // State for existing polls
  const [polls, setPolls] = useState<{
    id: string;
    title: string;
    description: string;
    options: PollOption[];
    totalVotes: number;
    voted: boolean;
    createdAt: Date;
    expiresAt: Date;
    allowMultipleVotes: boolean;
  }[]>([
    {
      id: "poll-1",
      title: "Next Group Dinner Location",
      description: "Where should we meet for our monthly dinner?",
      options: [
        { id: "option-1", text: "Italian Trattoria", votes: 8 },
        { id: "option-2", text: "Sushi Lounge", votes: 5 },
        { id: "option-3", text: "Tapas Bar", votes: 12 },
        { id: "option-4", text: "Steakhouse", votes: 4 },
      ],
      totalVotes: 29,
      voted: false,
      createdAt: new Date(2025, 3, 8),
      expiresAt: new Date(2025, 3, 15),
      allowMultipleVotes: false
    }
  ]);

  // Add a new option to the poll creation form
  const addPollOption = () => {
    setPollOptions([
      ...pollOptions,
      { id: `${pollOptions.length + 1}`, text: "", votes: 0 },
    ]);
  };

  // Remove an option from the poll creation form
  const removePollOption = (indexToRemove: number) => {
    if (pollOptions.length <= 2) return; // Keep at least 2 options
    setPollOptions(pollOptions.filter((_, i) => i !== indexToRemove));
  };

  // Handle option text change in poll creation form
  const handleOptionChange = (index: number, text: string) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index].text = text;
    setPollOptions(updatedOptions);
  };

  // Create new poll
  const createPoll = () => {
    if (!pollTitle.trim() || pollOptions.some(opt => !opt.text.trim())) {
      return; // Validate required fields
    }

    const today = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(today.getDate() + expireDays);

    const newPoll = {
      id: `poll-${Date.now()}`,
      title: pollTitle,
      description: pollDescription,
      options: pollOptions.map(opt => ({ ...opt, votes: 0 })),
      totalVotes: 0,
      voted: false,
      createdAt: today,
      expiresAt: expiryDate,
      allowMultipleVotes
    };

    setPolls([newPoll, ...polls]);
    
    // Reset the form
    setPollTitle("");
    setPollDescription("");
    setPollOptions([
      { id: "1", text: "", votes: 0 },
      { id: "2", text: "", votes: 0 },
    ]);
    setAllowMultipleVotes(false);
    setExpireDays(7);
    setIsDialogOpen(false);
  };

  // Vote on a poll
  const vote = (pollId: string, optionId: string) => {
    setPolls(polls.map(poll => {
      if (poll.id !== pollId) return poll;
      
      const updatedOptions = poll.options.map(opt => {
        if (opt.id === optionId) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });
      
      return {
        ...poll,
        options: updatedOptions,
        totalVotes: poll.totalVotes + 1,
        voted: true
      };
    }));
  };

  return (
    <div className="space-y-6">
      {isGroupModerator && (
        <div className="flex justify-end mb-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <ListChecks className="h-4 w-4" />
                Create Poll
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create a New Poll</DialogTitle>
                <DialogDescription>
                  Create a poll for group members to vote on
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="poll-title">Poll Title</Label>
                  <Input
                    id="poll-title"
                    placeholder="What's this poll about?"
                    value={pollTitle}
                    onChange={(e) => setPollTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="poll-description">Description (Optional)</Label>
                  <Input
                    id="poll-description"
                    placeholder="Add some context for your poll"
                    value={pollDescription}
                    onChange={(e) => setPollDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>Poll Options</Label>
                  {pollOptions.map((option, index) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <Input 
                        placeholder={`Option ${index + 1}`}
                        value={option.text}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => removePollOption(index)}
                        disabled={pollOptions.length <= 2}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={addPollOption}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Option
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="multiple-votes"
                      checked={allowMultipleVotes}
                      onCheckedChange={setAllowMultipleVotes}
                    />
                    <Label htmlFor="multiple-votes">Allow multiple votes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="expire-days">Expire in</Label>
                    <select 
                      id="expire-days"
                      className="rounded border p-1"
                      value={expireDays}
                      onChange={(e) => setExpireDays(parseInt(e.target.value))}
                    >
                      <option value={1}>1 day</option>
                      <option value={3}>3 days</option>
                      <option value={7}>7 days</option>
                      <option value={14}>14 days</option>
                      <option value={30}>30 days</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={createPoll}
                  disabled={!pollTitle || pollOptions.some(opt => !opt.text.trim())}
                >
                  Create Poll
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
      
      <div className="space-y-6">
        {polls.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center text-muted-foreground">
              No active polls at the moment.
            </CardContent>
          </Card>
        )}
        
        {polls.map((poll) => (
          <Card key={poll.id}>
            <CardHeader>
              <CardTitle>{poll.title}</CardTitle>
              <CardDescription>{poll.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {poll.options.map((option) => {
                  const percentage = poll.totalVotes > 0 
                    ? Math.round((option.votes / poll.totalVotes) * 100) 
                    : 0;
                    
                  return (
                    <div key={option.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {!poll.voted ? (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => vote(poll.id, option.id)}
                              className="h-8 w-8 rounded-full p-0"
                            >
                              <span className="sr-only">Vote for {option.text}</span>
                            </Button>
                          ) : (
                            <span className="h-8 w-8 flex items-center justify-center">
                              {option.votes > 0 && <CheckCircle className="h-5 w-5 text-primary" />}
                            </span>
                          )}
                          <span>{option.text}</span>
                        </div>
                        <span className="text-sm font-medium">{percentage}%</span>
                      </div>
                      <Progress
                        value={percentage}
                        className={cn(
                          "h-2",
                          poll.voted && "bg-muted"
                        )}
                      />
                      <div className="text-xs text-muted-foreground">
                        {option.votes} vote{option.votes !== 1 ? 's' : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-xs text-muted-foreground">
              <div>Created: {poll.createdAt.toLocaleDateString()}</div>
              <div>Expires: {poll.expiresAt.toLocaleDateString()}</div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
