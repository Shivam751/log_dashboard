from django.http import JsonResponse
from rest_framework.views import APIView
import json

def parse_log_file():
    print("parsing log file ...")
    log_file_path = 'logs(1)'

    # Read the log file
    with open(log_file_path, 'r', encoding='utf-8', errors='replace') as file:
        log_content = file.read()

    # search for '^C' and remove it
    # log_content = log_content.replace('^C', '')

    last_valid_json_end = log_content.rfind('},')
    log_content = log_content[:last_valid_json_end + 1] + ']}'

    # Parse the JSON content
    try:
        log_data = json.loads(log_content, strict=False)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return []

    # Extract the log entries
    log_entries = log_data.get('logs', [])

    # Return the list of log entries
    return log_entries

class TaskCommandsAPIView(APIView):
    def get(self, request, *args, **kwargs):
        log_data = parse_log_file()
        task_commands = sorted(set(entry['event_context']['task_context']['task_command'] for entry in log_data))
        return JsonResponse(task_commands, safe=False)
    
class LogEventsAPIView(APIView):
    def get(self, request, *args, **kwargs):
        task_command = request.GET.get('task_command')
        log_data = parse_log_file()
        events = [entry for entry in log_data if entry['event_context']['task_context']['task_command'] == task_command]
        return JsonResponse(events, safe=False)
    
    
    