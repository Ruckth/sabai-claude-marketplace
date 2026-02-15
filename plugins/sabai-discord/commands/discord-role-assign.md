# /discord-role-assign Command

Assign a role to a Discord user.

## Usage

```
/discord-role-assign [user] [role]
```

## Parameters

- `user` - Username or user ID (optional, will prompt if not provided)
- `role` - Role name or ID (optional, will prompt if not provided)

## Behavior

When this command is invoked:

1. If user and role provided, proceed with assignment
2. If partial info provided, ask for missing details
3. If nothing provided, ask:
   - Which user should receive the role?
   - Which role should be assigned?

4. Look up user ID if needed:
   - Use `get_user_id_by_name` tool

5. Use Discord MCP tools:
   - Assign role to user

6. Confirm role assignment

## Examples

```
/discord-role-assign @john moderator
/discord-role-assign sarah "Content Creator"
/discord-role-assign 123456789 admin
```

## Output

Provide:
1. Confirmation of role assigned
2. User and role names
3. Any errors (user not found, role not found, permission denied)
